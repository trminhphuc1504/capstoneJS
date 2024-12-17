import {qlspServices_admin} from '../services/qlsp_admin.service'
import { SanPham } from '../model/SanPham'




const renderTable = (arr)=>{
    let htmlContent = ''
    arr.forEach((item,index)=>{
        htmlContent += `
        <tr>
            <td>
                ${index + 1}
            </td>
            <td>
                ${item.tenSP}
            </td>
            <td>
                ${item.giaSP}
            </td>
            <td>
                <img width="100" height="100" src="${item.hinhSP}"/>
            </td>
            <td>
            <button 
            class="btn btn-warning" 
            data-toggle="modal" 
            data-target="#myModal"
            onclick="editProduct('${item.id}')"
        >
            Edit
        </button>
                <button class="btn btn-danger" onclick="deleteProduct('${item.id}')">Delete</button>
            </td>
        </tr>
        `
    })
}