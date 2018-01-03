package com.Service;

import com.Model.CityInfo;
import com.Repository.CityInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author: zhangocean
 * @Date: Created in 16:34 2018/1/2
 * Describe: 查询经纬度
 */
@Service
public class AddLocationService {


    @Autowired
    CityInfoRepository cityInfoRepository;

    public List<CityInfo> findAllCityInfo(){
        return cityInfoRepository.findAll();
    }

    public double getLongitude(String cityName){
        List<CityInfo> cityInfoList = findAllCityInfo();
        for(CityInfo city : cityInfoList){
            if(city.getCity().equals(cityName)){
                return city.getLongitude();
            }
        }
        return -1;
    }

    public double getLatitude(String cityName){
        List<CityInfo> cityInfoList = findAllCityInfo();
        for(CityInfo city : cityInfoList){
            if(city.getCity().equals(cityName)){
                return city.getLatitude();
            }
        }
        return  -1;
    }

//    static Map<String, double[]> map = new HashMap<>();
//
//    static {
//
//        map.put("成都", new double[]{104.06,30.67});
//        map.put("乐山", new double[]{103.59,29.75});
//        map.put("广安", new double[]{106.61,30.48});
//        map.put("济南", new double[]{117,36.65});
//
//    }
//
//    public double getLongitude(String cityLongitude){
//        for(Map.Entry<String,double[]> entry : map.entrySet()){
//            if(cityLongitude.equals(entry.getKey())){
//                return entry.getValue()[0];
//            }
//        }
//        return -1;
//    }
//
//    public double getLatitude(String cityLatitude){
//        for(Map.Entry<String,double[]> entry : map.entrySet()){
//            if(cityLatitude.equals(entry.getKey())){
//                return entry.getValue()[1];
//            }
//        }
//        return  -1;
//    }


}
