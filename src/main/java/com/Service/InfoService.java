package com.Service;

import com.Model.Info;
import com.Repository.InfoRepository;
import net.sf.json.JSONArray;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author: zhangocean
 * @Date: Created in 19:29 2017/12/18
 * Describe: 读取数据并计算来自同一地区的人数
 */
@Service
public class InfoService {

    Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private InfoRepository infoRepository;

    @Autowired
    AddLocationService addLocationService;

    public JSONArray getInfos() {

        List<Info> infoList = infoRepository.findAll();
        List<Map<String, Object>> newInfoList = new ArrayList<>();
        Map<String, Object> map ;
        int flag = -1;

        //计算来自同一地区的人数
        for(int i=0;i<infoList.size();i++){
            int count = 0;
            if(infoList.get(i).getId() != 0){
                map = new HashMap<>();
                map.put("name",infoList.get(i).getCity());
                map.put("number",count);
                //加入经纬度
                map.put("longitude", addLocationService.getLongitude(infoList.get(i).getCity()));
                map.put("latitude", addLocationService.getLatitude(infoList.get(i).getCity()));
                newInfoList.add(map);

                flag++;
            }
            for(int j=0;j<infoList.size();j++){
                if(infoList.get(j).getId() != 0 && infoList.get(j).getCity().equals(infoList.get(i).getCity())){
                    newInfoList.get(flag).put("number", ++count);
                    infoList.get(j).setId(0);
                }
            }

        }
        JSONArray jsonArray =JSONArray.fromObject(newInfoList.toArray());

        //logger.info(jsonArray.toString());

        return jsonArray;
    }
}
