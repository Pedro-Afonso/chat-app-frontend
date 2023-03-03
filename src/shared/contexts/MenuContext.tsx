/* eslint-disable no-console */
import { createContext, useState, useCallback } from 'react'

interface IMenuState {
  isUserOptionsOpen: boolean
  isNotificationsOpen: boolean
  anchorElement: null | HTMLElement
}

interface IMenuContextData {
  menu: IMenuState
  toogleIsUserOptionsOpen: (anchorElement: null | HTMLElement) => void
  toogleIsNotificationsOpen: (anchorElement: null | HTMLElement) => void
}

export const MenuContext = createContext({} as IMenuContextData)

interface IAppMenuProviderProps {
  children: React.ReactNode
}

export const AppMenuProvider: React.FC<IAppMenuProviderProps> = ({
  children
}) => {
  const [menu, setMenu] = useState<IMenuState>({
    isUserOptionsOpen: false,
    isNotificationsOpen: false,
    anchorElement: null
  })

  const toogleIsUserOptionsOpen = useCallback(
    (anchorElement: null | HTMLElement) => {
      setMenu(prev => ({
        ...prev,
        isUserOptionsOpen: !prev.isUserOptionsOpen,
        anchorElement
      }))
    },
    []
  )

  const toogleIsNotificationsOpen = (anchorElement: null | HTMLElement) => {
    setMenu(prev => ({
      ...prev,
      isUserOptionsOpen: !prev.isUserOptionsOpen,
      anchorElement
    }))
  }

  return (
    <MenuContext.Provider
      value={{ menu, toogleIsUserOptionsOpen, toogleIsNotificationsOpen }}
    >
      {children}
    </MenuContext.Provider>
  )
}
