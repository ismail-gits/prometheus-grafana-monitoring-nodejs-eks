# Monitoring Node.js Web Application with Prometheus, Grafana, and EKS

This repository contains comprehensive configurations for monitoring a Node.js web application using Prometheus and Grafana. The setup includes Kubernetes deployment files for the application, configurations for Prometheus alerting, and Terraform scripts for provisioning an AWS EKS cluster.

## Directory Structure

The project is organized as follows:

- **alert-manager-configuration**: Contains configurations for Alertmanager, defining routing and receivers for alerts.
- **app**: Holds the Node.js application and related assets.
- **terraform-aws-eks**: Includes Terraform scripts for provisioning an AWS EKS cluster along with necessary modules for VPC and EKS.
- **Dockerfile**: A Dockerfile for containerizing the Node.js application.
- **kubernetes-config.yaml**: Kubernetes deployment and service configurations for deploying applications.
- **kubernetes-service-monitor.yaml**: ServiceMonitor definition for Prometheus to scrape metrics from services.
- **package.json**: Dependency configuration for the Node.js application.

## Description

### Alert Manager Configuration

The `alert-manager-configuration` directory contains Alertmanager configurations for routing and receiving alerts.

- **alert-manager-configuration.yaml**: Defines routing and receivers for alerts.
- **alert-rules.yaml**: Contains Prometheus alerting rules.
- **email-secret.yaml**: Secret containing Gmail authentication information.

### Node.js Web Application

The `app` directory houses the Node.js application and its related assets.

- **index.html**: HTML template displaying information about the projects the team is working on.
- **server.js**: Node.js server file serving the application and generating metrics for Prometheus.

### Terraform AWS EKS

The `terraform-aws-eks` directory provides Terraform configurations for provisioning an Amazon EKS cluster.

- **eks-cluster.tf**: Defines resources for the EKS cluster.
- **terraform.tfvars**: Variables file containing configuration values.
- **vpc.tf**: Terraform configuration for creating a VPC.

### Additional Files

- **Dockerfile**: A Dockerfile for containerizing the Node.js application.
- **kubernetes-config.yaml**: Kubernetes deployment and service configurations for deploying applications.
- **kubernetes-service-monitor.yaml**: ServiceMonitor definition for Prometheus to scrape metrics from services.
- **package.json**: Dependency configuration for the Node.js application.

## Prerequisites

Ensure you have the following installed before proceeding:

- Helm
- Terraform
- AWS account credentials configured locally

## Getting Started

1. **Deploy AWS EKS Cluster**:
   - Navigate to the `terraform-aws-eks` directory.
   - Update `terraform.tfvars` with your AWS region and subnet configurations.
   - Run `terraform init` and `terraform apply` to provision the EKS cluster.

2. **Deploy Node.js Web Application**:
   - Build and deploy the Node.js application using the provided Dockerfile and Kubernetes configurations.

3. **Set up Prometheus and Grafana**:
    - Use Helm to install Prometheus and Grafana on your EKS cluster.
    - Import Grafana dashboard for monitoring.

4. **Configure Alerting**:
    - Configure Alertmanager with appropriate email settings and alert rules.

5. **Access Prometheus and Grafana**:
    - Port forward to access Prometheus and Grafana dashboards for monitoring.