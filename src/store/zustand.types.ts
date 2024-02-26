export interface AuthState {
  isLogin?: boolean;
  setLogin: () => void;
  setLogout: () => void;
  userRole: string;
  setUserRole: (data: string) => void;
  userId: number;
  setUserId: (data: number) => void;
  userAccessToken: string;
  setUserAccessToken: (data: string) => void;
  userRefreshToken: string;
  setUserRefreshToken: (data: string) => void;
}

export interface ArtworkState {
  clickedArtworkId: number;
  setClickedArtworkId: (id: number) => void;
}

export type modalType =
  | 'uploadModal'
  | 'artModal'
  | 'askForSignup'
  | 'askForDelete'
  | 'withdrawalModal'
  | 'editModal'
  | 'warningForBigImageModal';

export interface ModalState {
  modals: modalType[];
  showModal: (type: modalType) => void;
  hideModal: (type: modalType) => void;
  clearModal: () => void;
}
