export const EMAIL_REGX = /^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i;

export const baseUrl = process.env.HOST

export const loader_text = 'Please wait....'

export const flagLink = {
    tanzania: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Flag_of_Tanzania.svg/1200px-Flag_of_Tanzania.svg.png",
    s_africa: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Flag_of_South_Africa.svg/188px-Flag_of_South_Africa.svg.png",
    s_sudan: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Flag_of_South_Sudan.svg/188px-Flag_of_South_Sudan.svg.png",
    rwanda: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Flag_of_Rwanda.svg/188px-Flag_of_Rwanda.svg.png",
    kenya: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Kenya.svg/188px-Flag_of_Kenya.svg.png",
    uganda: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Flag_of_Uganda.svg/188px-Flag_of_Uganda.svg.png",
    ghana: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Flag_of_Ghana.svg/188px-Flag_of_Ghana.svg.png",
    nigeria: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Flag_of_Nigeria.svg/188px-Flag_of_Nigeria.svg.png"
}

export const countries = ['Tanzania', 'S.Africa', 'S.Sudan', 'Rwanda', 'Kenya', 'Uganda', 'Ghana', 'Nigeria']

export const kaino_plans = [
    {
        name: 'KAINO BASIC',
        value: 'KAINO_BASIC'
    },
    {
        name: 'KAINO PLUS',
        value: 'KAINO_PLUS'
    },
    {
        name: 'KAINO SOCIAL',
        value: 'KAINO_SOCIAL'
    }
]

export const rolesAccess = [
    {
        id: 1,
        name: "Admin",
        access: 'Full'
    },
    {
        id: 2,
        name: "Teacher",
        access: 'Limited'
    },
    {
        id: 3,
        name: "Parent",
        access: 'Read-only'
    },
    {
        id: 4,
        name: "Student",
        access: 'Limited'
    },
    {
        id: 5,
        name: "Head of Curriculum",
        access: 'Lessons'
    },
    {
        id: 6,
        name: "Content Creator",
        access: 'CMO'
    },
    {
        id: 7,
        name: "Finance",
        access: 'Finance Dashboard'
    },
    {
        id: 8,
        name: "School Admin",
        access: 'Full'
    }
];


export const arrayObjectFlat = (arr) => {
    const transformedArray = []
    arr.map(item => {
        const { user, ...rest } = item;
        transformedArray.push({ ...rest, ...user });
    });
    return transformedArray
}

import { saveAs } from 'file-saver';
import json2csv from 'json2csv';
import jwtDecode from 'jwt-decode';

export function convertToCSV(data) {
    const csv = json2csv.parse(data);
    const fileName = 'data.csv';
    const file = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(file, fileName);
}

export const getRole = (id) => {
    const token = localStorage.getItem('token')
    const decoded = jwtDecode(token)
    let roleId = id ? id : decoded?.role
    const roleDetails = rolesAccess.find(item => item.id == roleId)
    const name = roleDetails?.name
    return name
}