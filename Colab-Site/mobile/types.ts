export type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
  AddClient: { initialData?: { name: string; email: string; phone: string } } | undefined;
  ContactsImport: undefined;
  AddContract: undefined;
  // Legacy routes kept for compatibility if needed, but should be accessed via MainTabs
  Dashboard: undefined;
  ClientList: undefined;
  ContractList: undefined;
  Subscription: undefined;
  ClientDetails: { clientId: number };
};

export type MainTabParamList = {
  Dashboard: undefined;
  ContractList: undefined;
  ClientList: undefined;
  Settings: undefined;
};
