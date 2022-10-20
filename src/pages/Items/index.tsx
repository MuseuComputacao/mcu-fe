import React, { useEffect, useState } from "react";

import { DashboardView } from "../Dashboard/styles";

import Sidebar from "../../components/Sidebar";
import { DataTable } from "react-native-paper";
import { View, Text, TouchableOpacity, Image } from "react-native";

import FeatherIcons from "react-native-vector-icons/Feather";
import ItemService from "../../services/ItemService";
import { useLinkTo } from "@react-navigation/native";
import { style } from "../../globalStyles";

const Items = (props: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [items, setItems] = useState<any[]>([]);
  const [sortDirectionDescending, setSortDirectionDescending] = useState(true);

  function getIsOpenProp(getIsOpen: boolean) {
    setIsOpen(getIsOpen);
  }

  async function getItems() {
    ItemService.getItems()
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleSortDirecton() {
    items.reverse();
    setSortDirectionDescending(!sortDirectionDescending);
  }

  useEffect(() => {
    getItems();
  }, []);

  const linkTo = useLinkTo();

  return (
    <View style={{ display: "flex", flexDirection: "row", height: "100%" }}>
      <Sidebar func={getIsOpenProp} />
      <DashboardView isOpen={isOpen}>
        <View style={{ margin: 25 }}>
          <TouchableOpacity
            onPress={() => linkTo("/admin/items/add")}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <FeatherIcons name="user-plus" size={20} />
            <Text style={{ fontSize: 20, marginLeft: 5 }}>
              Adicionar novo item
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={{ fontSize: "23px", textAlign: "center" }}>
          Lista de Items:
        </Text>
        <View style={{ padding: 30 }}>
          <DataTable style={{ backgroundColor: "white", borderRadius: 10 }}>
            <DataTable.Header>
              <DataTable.Title>
                Picture:
              </DataTable.Title>
              <DataTable.Title
                sortDirection={
                  sortDirectionDescending ? "descending" : "ascending"
                }
                onPress={() => handleSortDirecton()}
              >
                Name:
              </DataTable.Title>
              <DataTable.Title>
                Status:
              </DataTable.Title>
              <DataTable.Title
                style={{ display: "flex", flexDirection: "row-reverse" }}
              >
                Actions:
              </DataTable.Title>
            </DataTable.Header>

            {items.length != 0 &&
              items.map((item, index) => {
                return (
                  <DataTable.Row key={index}>
                    {/* <DataTable.Cell> {item.id_photo} </DataTable.Cell> */}
                    <DataTable.Cell> <Image source={require("../../../assets/museu-icon.png")} style={{height: 100, width: 100}} /> </DataTable.Cell>
                    <DataTable.Cell> {item.name} </DataTable.Cell>
                    <DataTable.Cell> {item.status} </DataTable.Cell>
                    <DataTable.Cell
                      style={{ display: "flex", flexDirection: "row-reverse" }}
                    >
                      {" "}
                      <FeatherIcons name="trash" />{" "}
                    </DataTable.Cell>
                  </DataTable.Row>
                );
              })}
          </DataTable>
        </View>
      </DashboardView>
    </View>
  );
};

export default Items;
