package com.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author: zhangocean
 * @Date: Created in 15:39 2018/1/2
 * Describe:
 */
@Controller
public class BackController {

    @RequestMapping("/")
    public String index(){
        return "aboutUS-other";
    }

}
