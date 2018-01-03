package com.Repository;

import com.Model.CityInfo;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author: zhangocean
 * @Date: Created in 14:51 2018/1/3
 * Describe:
 */
public interface CityInfoRepository extends JpaRepository<CityInfo, Integer> {
}
