const baseUrl = 'https://6728d9246d5fa4901b6b3112.mockapi.io/'

export const qlspServices_admin = {
    getProductList: () =>{
        return axios({
            method: 'GET',
            url: `${baseUrl}/CapstoneJS`
        })
    },

    addProduct: (payload)=>{
        return axios({
            method: 'POST',
            url: `${baseUrl}/CapstoneJS`,
            data:payload,
        })
    },

    getProductById: (productId)=>{
        return axios({
            method: 'GET',
            url: `${baseUrl}/CapstoneJS/${productId}`,
        })
    },

    editProduct:(productId,payload)=>{
        return axios({
            method: 'PUT',
            url: `${baseUrl}/CapstoneJS/${productId},`,
            data:payload
        })
    },

    deleteProduct:(productId)=>{
        return axios({
            method: 'DELETE',
            url: `${baseUrl}/CapstoneJS/${productId}`
        })
    }
}