import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Routes } from './src/routes/index';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Routes />
    </>
  );
}