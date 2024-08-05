export const fetchData = async (url: string) => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const text = await response.text() // Get the response as text first
    try {
      return JSON.parse(text) // Try to parse it as JSON
    } catch (e) {
      console.error('Response is not valid JSON:', text)
      throw new Error('Invalid JSON response')
    }
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error)
    throw error
  }
}
