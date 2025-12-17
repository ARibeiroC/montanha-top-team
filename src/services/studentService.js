export const studentService = {
  async createStudent(studentData) {
    // Simulating API call
    await new Promise((resolve) => setTimeout(resolve, 1200))
    
    // Simulating success response
    // In a real scenario, this would be: return axios.post('/students', studentData)
    const status = 200
    
    if (status === 200) {
      return { success: true, data: studentData }
    }
    
    throw new Error('Erro ao cadastrar aluno')
  }
}
