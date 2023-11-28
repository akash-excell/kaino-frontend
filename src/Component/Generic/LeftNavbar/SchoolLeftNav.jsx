import { Layout, Menu } from 'antd';
import styles from '@/styles/adminNavbar.module.css'
import { AiOutlineCheckCircle, AiOutlineHome, AiOutlineLogout, AiOutlinePlusCircle, AiOutlineSetting, AiOutlineWallet } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { BsBook } from 'react-icons/bs';
import { IoIosPeople, IoMdSchool } from 'react-icons/io';
import { BiUser } from 'react-icons/bi';
import { MdAccountBox } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { GoBook } from 'react-icons/go';

const { Sider } = Layout;

function SchoolLeftNav() {
    const router = useRouter()
    const pathname = router.asPath.split('/dashboard/school/')[1];
    const { isCollapsed } = useSelector(state => state.navbar)
    const [defaultSelectedItem, setDefaultSelectedItem] = useState('1')

    useEffect(() => {
        if (pathname) {
            if (pathname == 'create-student')
                setDefaultSelectedItem('3')
            else if (pathname == 'create-parent')
                setDefaultSelectedItem('4')
            else if (pathname == 'create-teacher')
                setDefaultSelectedItem('5')
            if (pathname === 'all-coverage')
                setDefaultSelectedItem('6')
            else if (pathname == 'students-card')
                setDefaultSelectedItem('7')
            else if (pathname === 'all-teachers')
                setDefaultSelectedItem('8')
            else if (pathname === 'all-parents')
                setDefaultSelectedItem('9')
            else if (pathname === 'roll-call')
                setDefaultSelectedItem('10')
            else if (pathname === 'subscriptions')
                setDefaultSelectedItem('11')
            else if (pathname === 'accounts')
                setDefaultSelectedItem('12')
            else if (pathname === 'account-settings')
                setDefaultSelectedItem('13')
            else if (pathname === 'manage-lessons')
                setDefaultSelectedItem('15')
            else setDefaultSelectedItem('')
        }
        else
            setDefaultSelectedItem('1')
    }, [pathname])

    const handleChange = ({ key }) => {
        if (key === '1')
            router.push('/dashboard/school')
        else if (key === '3')
            router.push('/dashboard/school/create-student')
        else if (key === '4')
            router.push('/dashboard/school/create-parent')
        else if (key === '5')
            router.push('/dashboard/school/create-teacher')
        if (key === '6')
            router.push('/dashboard/school/all-coverage')
        else if (key == '7')
            router.push('/dashboard/school/students-card')
        else if (key == '8')
            router.push('/dashboard/school/all-teachers')
        else if (key == '9')
            router.push('/dashboard/school/all-parents')
        else if (key == '10')
            router.push('/dashboard/school/roll-call')
        else if (key == '11')
            router.push('/dashboard/school/subscriptions')
        else if (key == '12')
            router.push('/dashboard/school/accounts')
        else if (key == '13')
            router.push('/dashboard/school/account-settings')
        else if (key == '15')
            router.push('/dashboard/school/manage-lessons')
        else if (key === '14') {
            localStorage.clear()
            router.push('/')
        }

    }

    return (
        <Sider trigger={null} collapsible collapsed={isCollapsed}
            collapsedWidth={'85px'}
            width={'270px'}
            style={{ minHeight: '100%' }}
            className={styles.layout_nav}
        >
            <div className={styles.logo} >
                {
                    isCollapsed ? 'K' : 'KAINO'
                }
            </div>
            <Menu
                theme="dark"
                mode="inline"
                style={{
                    background: '#891b55',
                    padding: "10px 16px",
                    borderRadius: "0 20px 16px 0",
                    display: "flex",
                    flexDirection: 'column',
                    gap: "0.5rem",
                    color: '#fff',
                    fontWeight: '600'
                }}
                defaultSelectedKeys={['1']}
                selectedKeys={[defaultSelectedItem]}
                onSelect={(info) => handleChange(info)}
            >
                <Menu.Item key="1" icon={<AiOutlineHome size={"1.6rem"} />} style={{ width: "100%" }}>
                    Dashboard
                </Menu.Item>
                <Menu.SubMenu key="2" icon={<AiOutlinePlusCircle size={"1.6rem"} />} title="Create" style={{ width: "100%" }}>
                    <Menu.Item key="3" style={{ width: "100%" }}>Student</Menu.Item>
                    <Menu.Item key="4" style={{ width: "100%" }}>Parent</Menu.Item>
                    <Menu.Item key="5" style={{ width: "100%" }}>Teachers</Menu.Item>
                </Menu.SubMenu>
                <Menu.Item key="6" icon={<BsBook size={"1.6rem"} />} style={{ width: "100%" }}>
                    Classes
                </Menu.Item>
                <Menu.Item key="7" icon={<IoMdSchool size={"1.6rem"} />} style={{ width: "100%" }}>
                    Students
                </Menu.Item>
                <Menu.Item key="8" icon={<IoIosPeople size={"1.6rem"} />} style={{ width: "100%" }}>
                    Teachers
                </Menu.Item>
                <Menu.Item key="9" icon={<BiUser size={"1.6rem"} />} style={{ width: "100%" }}>
                    Parents
                </Menu.Item>
                <Menu.Item key="15" icon={<GoBook size={"1.6rem"} />} style={{ width: "100%" }}>
                    Lessons
                </Menu.Item>
                <Menu.Item key="10" icon={<AiOutlineCheckCircle size={"1.6rem"} />} style={{ width: "100%" }}>
                    Roll-Call
                </Menu.Item>
                <Menu.Item key="11" icon={<AiOutlineWallet size={"1.6rem"} />} style={{ width: "100%" }}>
                    Subscription
                </Menu.Item>
                <Menu.Item key="12" icon={<MdAccountBox size={"1.6rem"} />} style={{ width: "100%" }}>
                    Accounts
                </Menu.Item>
                <Menu.Item key="13" icon={<AiOutlineSetting size={"1.6rem"} />} style={{ width: "100%" }}>
                    Settings
                </Menu.Item>
                <Menu.Item key="14" icon={<AiOutlineLogout size={"1.6rem"} />} style={{ width: "100%" }}>
                    Log out
                </Menu.Item>
            </Menu>
        </Sider>
    )
}

export default SchoolLeftNav