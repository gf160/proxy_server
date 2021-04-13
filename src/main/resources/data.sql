CREATE TABLE tb_proxy_info
(
  port integer NOT NULL,
  dstIp varchar(15) NOT NULL,
  dstPort integer NOT NULL,
  primary key(port)
);