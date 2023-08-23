"use client";

import React, { useState } from "react";
import { Select, Space } from "antd";
import { useSelector } from "react-redux";
import ProtectedRoute from "../protectedRoute";
import ProductCard from "@/components/shared/ProductCard";

const provinceData = ["Zhejiang", "Jiangsu"];

const cityData = {
  Zhejiang: ["Hangzhou", "Ningbo", "Wenzhou"],
  Jiangsu: ["Nanjing", "Suzhou", "Zhenjiang"],
};

type CityName = keyof typeof cityData;

export default function Admin() {
  const [cities, setCities] = useState(cityData[provinceData[0] as CityName]);
  const [secondCity, setSecondCity] = useState(
    cityData[provinceData[0] as CityName][0]
  );

  const handleProvinceChange = (value: CityName) => {
    setCities(cityData[value]);
    setSecondCity(cityData[value][0]);
  };

  const onSecondCityChange = (value: CityName) => {
    setSecondCity(value);
  };

  const { value } = useSelector((store: any) => store.productReducer);

  return (
      <ProtectedRoute>
        <main className="responsive">
          <span className="responsive_wrapper grid grid-cols-[235px,_1fr] gap-4 py-3 mb-6">
            <div className="bg-yellow">
              <Space wrap>
                <Select
                  // defaultValue={provinceData[0]}
                  style={{ width: 120 }}
                  onChange={handleProvinceChange}
                  options={provinceData.map((province) => ({
                    label: province,
                    value: province,
                  }))}
                />
                <Select
                  style={{ width: 120 }}
                  // value={secondCity}
                  onChange={onSecondCityChange}
                  options={cities.map((city) => ({ label: city, value: city }))}
                />
                <Select
                  style={{ width: 120 }}
                  // value={secondCity}
                  onChange={onSecondCityChange}
                  options={cities.map((city) => ({ label: city, value: city }))}
                />
                <Select
                  style={{ width: 120 }}
                  // value={secondCity}
                  onChange={onSecondCityChange}
                  options={cities.map((city) => ({ label: city, value: city }))}
                />
                <Select
                  style={{ width: 120 }}
                  // value={secondCity}
                  onChange={onSecondCityChange}
                  options={cities.map((city) => ({ label: city, value: city }))}
                />
              </Space>
            </div>
            <div className="grid grid-cols-[repeat(4,_minmax(0,_1fr))] gap-4">
              {value[0]?.image.secure_url != "" &&
                value.map((product: any) => {
                  return <ProductCard key={product.SKU} data={product} />;
                })}
            </div>
          </span>
        </main>
      </ProtectedRoute>
  );
}
