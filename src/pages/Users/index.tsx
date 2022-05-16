import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import Sidebar from "../../components/Sidebar";
import { DashboardView } from "../Dashboard/styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserServices from '../../services/UserServices';
import { DataTable } from 'react-native-paper';
import FeatherIcons from 'react-native-vector-icons/Feather'

const Users = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [users, setUsers] = useState<any[]>([]);
    const [hasLoadedUsers, setHasLoadedUsers] = useState(false);
    const numberOfItemsPerPageList = [2, 3, 4];
    const [sortDirectionDescending, setSortDirectionDescending] = useState(true);

    const [page, setPage] = useState(0);
    const [numberOfItemsPerPage, onItemsPerPageChange] = useState(1);
    const from = page * numberOfItemsPerPage;
    const to = Math.min((page + 1) * numberOfItemsPerPage, users.length);

    React.useEffect(() => {
        setPage(0);
    }, [numberOfItemsPerPage]);

    function getIsOpenProp(getIsOpen: boolean) {
        setIsOpen(getIsOpen);
    }

    async function getUsers() {
        const value = await AsyncStorage.getItem('@user')
        const teste = JSON.parse(value)
        const config = {
            headers: {
                'access-token': teste.token,
                uid: teste.uid,
                client: teste.client
            }
        }
        UserServices.showUsers(config).then(response => {
            setUsers(response.data);
            setHasLoadedUsers(true);
        }).catch(error => {
            console.log(error)
        });
    }

    function handleSortDirecton() {
        users.reverse();
        setSortDirectionDescending(!sortDirectionDescending);
    }

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <View style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
            <Sidebar func={getIsOpenProp} />
            <DashboardView isOpen={isOpen}>

                <View style={{ margin: 25 }}>
                    <TouchableOpacity onPress={() => console.log('adicionar')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FeatherIcons name='user-plus' size={20} />
                        <Text style={{ fontSize: 20, marginLeft: 5 }}>Adicionar novo usuário</Text>
                    </TouchableOpacity>
                </View>

                <Text style={{ fontSize: '23px', textAlign: 'center' }}>
                    Todos os usuários:
                </Text>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title sortDirection={sortDirectionDescending ? 'descending' : 'ascending'} onPress={() => handleSortDirecton()}>Name:</DataTable.Title>
                        <DataTable.Title>Role:</DataTable.Title>
                        <DataTable.Title style={{}}>Actions:</DataTable.Title>
                    </DataTable.Header>

                    {users.map((user,index) => {
                        return (
                            <DataTable.Row key={index}>
                                <DataTable.Cell> {user.name} </DataTable.Cell>
                                <DataTable.Cell> {user.role} </DataTable.Cell>
                                <DataTable.Cell> <FeatherIcons name='trash' /> </DataTable.Cell>
                            </DataTable.Row>
                        )
                    })}

                    <DataTable.Pagination
                        page={page}
                        numberOfPages={Math.ceil(users.length / numberOfItemsPerPage)}
                        onPageChange={page => setPage(page)}
                        label={`${from + 1}-${to} of ${users.length}`}
                        showFastPaginationControls
                        // numberOfItemsPerPageList={numberOfItemsPerPageList}
                        numberOfItemsPerPage={numberOfItemsPerPage}
                        onItemsPerPageChange={onItemsPerPageChange}
                    // selectPageDropdownLabel={'Rows per page'}
                    />
                </DataTable>

            </DashboardView>
        </View>
    )
}

export default Users;