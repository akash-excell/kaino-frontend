import { getSchoolProfileRequest, getSchoolProfileReset } from '@/redux/slices/school/getSchoolProfile'
import { dispatch } from '@/redux/store'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import SchoolProfileView from '@/Component/Generic/schools/SchoolProfileView'

function SchoolProfileContent2() {
  const [data, setData] = useState({})

  const router = useRouter()

  const getSchoolProfileState = useSelector(state => state.getSchoolProfile)

  useEffect(() => {
    dispatch(getSchoolProfileRequest())
  }, [])

  useEffect(() => {
    if (getSchoolProfileState.isSuccess) {
      setData(getSchoolProfileState.data?.data)
      dispatch(getSchoolProfileReset())
    }
  }, [getSchoolProfileState.isSuccess])

  useEffect(() => {
    if (getSchoolProfileState.isError) {
      router.push('/dashboard/school')
      dispatch(getSchoolProfileReset())
    }
  }, [getSchoolProfileState.isError])

  return (
    <SchoolProfileView data={data} />
  )
}

export default SchoolProfileContent2