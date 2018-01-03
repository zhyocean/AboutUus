package com.Model;

import jdk.nashorn.internal.objects.annotations.Getter;

import javax.persistence.*;

/**
 * @author: zhangocean
 * @Date: Created in 14:47 2018/1/3
 * Describe:
 */
@Entity
@Table(name = "city_info")
public class CityInfo {

    @Id
    @GeneratedValue
    private Integer id;

    @Column(name = "city")
    private String city;

    @Column(name = "longitude")
    private double longitude;

    @Column(name = "latitude")
    private double latitude;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public CityInfo() {
    }

    public CityInfo(String city, double longitude, double latitude) {
        this.city = city;
        this.longitude = longitude;
        this.latitude = latitude;
    }


}
