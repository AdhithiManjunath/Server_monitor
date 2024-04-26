# PROMETHEUS  
Prometheus is a powerful open-source monitoring and alerting toolkit that collects metrics from monitored targets, stores them in a time-series database, and enables querying and analysis of these metrics in real-time. It offers flexible and scalable monitoring capabilities, making it well-suited for dynamic cloud-native environments.
(PORT : 9090)

# GRAFANA
Grafana complements Prometheus by providing visualization and dashboarding capabilities for monitoring data. It allows users to create customizable dashboards with graphs, charts, and other visualizations to visualize and analyze metric data collected by Prometheus. Grafana's rich set of features and plugins make it a popular choice for creating intuitive and interactive dashboards.
(PORT:3000)
- to setup grafana
docker run -d -p 3000:3000 --name=grafana grafana/grafana-oss

# LOKI
Loki extends the monitoring ecosystem by offering log aggregation and querying capabilities. Inspired by Prometheus, Loki stores log data in a highly efficient and compressed format, making it ideal for handling large volumes of log data in distributed systems. With its integration with Prometheus and compatibility with PromQL, Loki simplifies log analysis and troubleshooting, enabling users to correlate metrics and logs for deeper insights into system behavior.
(PORT:3100)
- to setup grafana
docker run -d --name=loki -p 3100:3100 grafana/loki

In conclusion , prometheus is used for server metrics , loki is used for log collection whereas grafana is mainly used for visualisation and creation of dashboards 
