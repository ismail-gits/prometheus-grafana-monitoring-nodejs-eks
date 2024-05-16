provider "kubernetes" {
    load_config_file = "false"
    host = data.aws_eks_cluster.ansible-cluster.endpoint
    cluster_ca_certificate = base64decode(data.aws_eks_cluster.ansible-cluster.certificate_authority[0].data)
    token = data.aws_eks_cluster_auth.ansible-cluster.token
}

data "aws_eks_cluster" "ansible-cluster" {
    name = "ansible-eks-cluster"
    depends_on = [module.eks.cluster_name]
}

data "aws_eks_cluster_auth" "ansible-cluster" {
    name = "ansible-eks-cluster"
    depends_on = [module.eks.cluster_name]
}

module "eks" {
    source = "terraform-aws-modules/eks/aws"
    version = "20.4.0"

    cluster_name = "ansible-eks-cluster"
    cluster_version = "1.29"

    cluster_endpoint_public_access  = true

    cluster_addons = {
        coredns = {
            most_recent = true
        }
        kube-proxy = {
            most_recent = true
        }
        vpc-cni = {
            most_recent = true
        }
    }

    vpc_id = module.ansible-vpc.vpc_id
    subnet_ids = module.ansible-vpc.private_subnets

    eks_managed_node_groups = {
        eks-node-group-1 = {
            min_size = 1
            max_size = 3
            desired_size = 2

            instance_types = ["t3.medium"]
            capacity_type = "SPOT"
        }
    }

    enable_cluster_creator_admin_permissions = true

    tags = {
        environment = "development"
        application = "ansible"
    }
}