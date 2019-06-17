FROM mysql:5.7

#ENV MYSQL_DATABASE longnight
#ENV MYSQL_ROOT_PASSWORD pass123
#ENV MYSQL_USER mysql
#ENV MYSQL_PASSWORD pass123
#ENV DATABASE_HOST db

# Add the content of the sql-scripts/ directory to your image
# All scripts in docker-entrypoint-initdb.d/ are automatically
# executed during container startup
COPY ./sql-scripts /docker-entrypoint-initdb.d/
