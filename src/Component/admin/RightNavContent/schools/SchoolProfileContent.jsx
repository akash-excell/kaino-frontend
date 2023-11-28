import { getAllSchoolsRequest, getAllSchoolsReset } from '@/redux/slices/admin/getAllSchools'
import { dispatch } from '@/redux/store'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import SchoolProfileView from '@/Component/Generic/schools/SchoolProfileView'

function SchoolProfileContent({ id }) {
  const [data, setData] = useState({})

  const router = useRouter()

  const getAllSchoolsState = useSelector(state => state.getAllSchools)

  useEffect(() => {
    if (id) {
      dispatch(getAllSchoolsRequest(`${id}/`))
    }
  }, [id])

  useEffect(() => {
    if (getAllSchoolsState.isSuccess) {
      setData(getAllSchoolsState.data?.data?.results[0])
      dispatch(getAllSchoolsReset())
    }
  }, [getAllSchoolsState.isSuccess])

  useEffect(() => {
    if (getAllSchoolsState.isError) {
      router.push('/dashboard/admin')
      dispatch(getAllSchoolsReset())
    }
  }, [getAllSchoolsState.isError])

  return (
    <SchoolProfileView data={data} />
  )
}

export default SchoolProfileContent