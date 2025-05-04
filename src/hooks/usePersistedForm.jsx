import useLocalStorage from "./useLocalStorage"

function usePersistedForm(formKey, initialValues) {
  const [formData, setFormData] = useLocalStorage(`craftly-form-${formKey}`, initialValues)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const resetForm = () => {
    setFormData(initialValues)
  }

  return { formData, handleChange, resetForm, setFormData }
}

export default usePersistedForm

