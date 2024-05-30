import { useState } from 'react'
import Service from '../../../api/api-service'
import { ApiUrl } from '../../../api/api-url'
import NotificationService from '../../../common/notification-service'

const service = new Service()
const useUpdateAccountInfo = ({ files = [], resetScreen }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdateAccountInfo = async (data) => {
    if (!data) return
    const formData = generateFormData(data, files)

    setIsLoading(true)
    try {
      const response = await service.post(
        ApiUrl.UpdateUserAccountDetail,
        formData,
      )

      response?.content?.status &&
        NotificationService.success('Cập nhật thông tin tài khoản thành công')
      resetScreen && resetScreen()
    } catch (error) {
      NotificationService.error(error?.errorMessage ?? '')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    handleUpdateAccountInfo,
    isUpdating: isLoading,
  }
}

const generateFormData = (data, files) => {
  const birthDay = new Date(data.birthDay).toISOString()
  let formData = new FormData()
  formData.append('FullName', data.fullName)
  formData.append('Email', data.email)
  formData.append('DateOfBirth', birthDay)
  formData.append('Sex', data.gender)
  formData.append('Address', data.address)
  formData.append('Description', data.description)
  formData.append('PhoneNumber', data.phone)

  files &&
    files.length > 0 &&
    files.map(
      (file) =>
        file && file.fileId && formData.append('DocumentUploadId', file.fileId),
    )
  return formData
}

export default useUpdateAccountInfo
