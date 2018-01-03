package com.Controller;

import com.Service.InfoService;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author: zhangocean
 * @Date: Created in 16:25 2018/1/2
 * Describe: ajax接收请求返回jsonArray数据
 */
@Controller
public class GetAllInfoController {

    @Autowired
    InfoService infoService;

    @RequestMapping(value = "/getAllInfo",method = RequestMethod.GET)
    @ResponseBody
    public JSONArray getAllInfo(){

        JSONArray jsonArray = infoService.getInfos();

        return jsonArray;
    }

}
