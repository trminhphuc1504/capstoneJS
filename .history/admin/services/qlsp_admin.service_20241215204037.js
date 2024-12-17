const baseUrl = 'https://6728d9246d5fa4901b6b3112.mockapi.io/'

export const qlspServices = {
    getProductList: () =>{
        return axios({
            method: 'GET',
            url: `${baseUrl}/CapstoneJS`
        })
    },
}