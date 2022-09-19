import React from 'react'
import { Icon, Menu } from 'semantic-ui-react'

export const TopMenu = () => {
  return (
    <Menu fixed='top' color={'blue'} inverted className='top-menu'>
        <Menu.Item className='top-menu__logo'>
            Sistema
        </Menu.Item>

        <Menu.Item position='right'>
            <Menu.Item>
                Hola, usuario
            </Menu.Item>
            <Menu.Item>
                <Icon name='sign-out'/>
            </Menu.Item>
        </Menu.Item>
    </Menu>
  )
}
