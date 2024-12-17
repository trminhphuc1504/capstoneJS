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
    }
}