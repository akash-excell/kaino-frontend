import React from 'react'
import styles from '@/styles/adminSchoolByCountry.module.css'
import Link from 'next/link'

function CountryCommonard({ link, count, country, type, color }) {
    return (
        <Link className={styles.countryCard} style={{ backgroundColor: color }} href={`/dashboard/admin/${type.toLowerCase()}-by-country/${country}`}>
            <div>
                <img src={link} alt="flag_icon" className={styles.flagImage} />
            </div>
            <div>
                <p style={{ fontSize: "1.5rem", fontWeight: '800' }}>{count}</p>
                <p style={{ fontWeight: '500' }}>Total {type} in {country}</p>
            </div>
        </Link>
    )
}

export default CountryCommonard