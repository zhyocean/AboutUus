package com.Model;

import javax.persistence.*;

/**
 * @author: zhangocean
 * @Date: Created in 19:18 2017/12/18
 * Describe:
 */
@Entity
@Table(name = "info")
public class Info {

    @Id
    @GeneratedValue
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "city")
    private String city;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Info() {
    }

    public Info(String name, String city) {
        this.name = name;
        this.city = city;
    }

    @Override
    public String toString() {
        return "Info{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", city='" + city + '\'' +
                '}';
    }
}
