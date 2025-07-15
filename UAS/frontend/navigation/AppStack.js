// navigation/AppStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Import screens untuk setiap entitas CRUD
import BookListScreen from '../screens/Books/BookListScreen';
import BookDetailScreen from '../screens/Books/BookDetailScreen';
import BookFormScreen from '../screens/Books/BookFormScreen';

import MemberListScreen from '../screens/Members/MemberListScreen';
import MemberDetailScreen from '../screens/Members/MemberDetailScreen';
import MemberFormScreen from '../screens/Members/MemberFormScreen';

import BranchListScreen from '../screens/Branches/BranchListScreen';
import BranchDetailScreen from '../screens/Branches/BranchDetailScreen';
import BranchFormScreen from '../screens/Branches/BranchFormScreen';

import LoanListScreen from '../screens/Loans/LoanListScreen';
import LoanDetailScreen from '../screens/Loans/LoanDetailScreen';
import LoanFormScreen from '../screens/Loans/LoanFormScreen';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Beranda' }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profil Saya' }} />

      {/* Books Stack */}
      <Stack.Screen name="BookList" component={BookListScreen} options={{ title: 'Daftar Buku' }} />
      <Stack.Screen name="BookDetail" component={BookDetailScreen} options={{ title: 'Detail Buku' }} />
      <Stack.Screen name="BookForm" component={BookFormScreen} options={{ title: 'Form Buku' }} />

      {/* Members Stack */}
      <Stack.Screen name="MemberList" component={MemberListScreen} options={{ title: 'Daftar Anggota' }} />
      <Stack.Screen name="MemberDetail" component={MemberDetailScreen} options={{ title: 'Detail Anggota' }} />
      <Stack.Screen name="MemberForm" component={MemberFormScreen} options={{ title: 'Form Anggota' }} />

      {/* Branches Stack */}
      <Stack.Screen name="BranchList" component={BranchListScreen} options={{ title: 'Daftar Cabang' }} />
      <Stack.Screen name="BranchDetail" component={BranchDetailScreen} options={{ title: 'Detail Cabang' }} />
      <Stack.Screen name="BranchForm" component={BranchFormScreen} options={{ title: 'Form Cabang' }} />

      {/* Loans Stack */}
      <Stack.Screen name="LoanList" component={LoanListScreen} options={{ title: 'Daftar Peminjaman' }} />
      <Stack.Screen name="LoanDetail" component={LoanDetailScreen} options={{ title: 'Detail Peminjaman' }} />
      <Stack.Screen name="LoanForm" component={LoanFormScreen} options={{ title: 'Form Peminjaman' }} />
    </Stack.Navigator>
  );
};

export default AppStack;
