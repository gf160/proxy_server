package com.hamon.h2db.repository;

import com.hamon.h2db.domain.TbProxyInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TbProxyInfoRepository extends JpaRepository<TbProxyInfo, Integer> {
}
