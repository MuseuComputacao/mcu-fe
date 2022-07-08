import React, { useState } from 'react';

import { DashboardView } from "../Dashboard/styles";

import Sidebar from "../../components/Sidebar";
import { DataTable } from 'react-native-paper';
import { View, Text } from 'react-native';



const Items = (props: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  function getIsOpenProp(getIsOpen: boolean) {
    setIsOpen(getIsOpen);
  }

  
    return (
      <View style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        <Sidebar func={getIsOpenProp} />

        <DashboardView isOpen={isOpen}>
          <View style={{ padding: 30 }}>
            <Text style={{ fontSize: 23 }}>
                Lista de Items:
            </Text>
            <DataTable>
              
            </DataTable>
          </View>
        </DashboardView>
      </View>
    );
  }

export default Items;