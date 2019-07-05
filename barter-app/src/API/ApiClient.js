import axios from "axios";
let _axiosInstance = null;

// Creating standard instance of axios for this API Client
_axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  // timeout: 2000,
  // headers: {
  //   "x-access-token": window.sessionStorage.getItem("JWT_CMS")
  // },
  timeout: 30000
});

class ApiClient {
  async login(email, password) {
    try {
      const { data } = await _axiosInstance.post("/users/login", {"email": email, "password": password});
      console.log("logged in data", data);
      return data;
    } catch (err) {
      console.log("error APIClient", err)
      throw err;
    }
  };

  async registerUser(firstName, lastName, email, password, phoneNumber){
    try{
      const {data} = await _axiosInstance.post("/users", 
            {"email": email, "password": password, "first_name": firstName, "last_name": lastName, "phone_number": phoneNumber})
      console.log("logged in data", data);
      return data;
    }catch(err){
      console.log("error APIClient", err)
      throw err;
    }
  }

  async getUserProfile(email){
    try{
      const {data} = await _axiosInstance.get("/users/" + email)
      console.log("user profile data", data);
      return data;
    }catch(err){
      console.log("error APIClient", err)
      throw err;
    }
  }

  async postAd(userId, productName, productDesc, catId, action, quantity, imageUrl){
    try{
      const {data} = await _axiosInstance.post("/products/createAd", 
            {"user_id": userId, 
            "prod_name": productName, 
            "prod_desc": productDesc, 
            "cat_id": catId, 
            "action": action,
            "quantity": quantity,
            "image_url": imageUrl})
      console.log("ad data", data);
      return data;
    }catch(err){
      console.log("error APIClient", err)
      throw err;
    }
  }
  
  async getAllAds(){
    try{
      const {data} = await _axiosInstance.post("/products/allAds")
      console.log("all Ad data", data);
      return data;
    }catch(err){
      console.log("error APIClient", err)
      throw err;
    }
  }

  async filterAllAds(catIdArray){
    try{
      const {data} = await _axiosInstance.post("/products/allAds", {"cat_id": catIdArray})
      console.log("filter Ad data", data);
      return data;
    }catch(err){
      console.log("error APIClient", err)
      throw err;
    }
  }

  async getUserAds(userId){
  try{
    const {data} = await _axiosInstance.post("/products/userAds", {name: userId})
    console.log("all Ad data", data);
    return data;
  }catch(err){
    console.log("error APIClient", err)
    throw err;
  }
}

  async addAdToWishList(id, user_id){
    try{
      const {data} = await _axiosInstance.post("/products/addWishList", {"userId": user_id, "advertId": id})
        console.log("wishlist data", data);
        return data;
    }catch(err){
      console.log("error APIClient", err)
      throw err;
    }
  }

  async getWishLisItems(userId){
    try{
      const {data} = await _axiosInstance.post("/products/viewWishList", {"user_id": userId})
        console.log("wishlist get data", data);
        return data;
    }catch(err){
      console.log("error APIClient", err)
      throw err;
    }
  }

 
  async createBarter(toId, withId, barterer, barteree, status, duration){
    try{
      const {data} = await _axiosInstance.post("/barter/createBarter", 
                    {"advertId1": toId, "advertId2": withId, 
                    "barter_email":barterer, "barteree_email": barteree, 
                    "status": status, "duration": duration})
        console.log("barter data", data);
        return data;
    }catch(err){
      console.log("error APIClient", err)
      throw err;
    }
  }

  async getBarterAds(email){
    try{
      const {data} = await _axiosInstance.post("/barter/getBarterAds", 
      {"barter_email": email})
      console.log("All barter data", data);
      return data;
    }catch(err){
      console.log("error APIClient", err)
      throw err;
    }
  }

  async getBarterAdsDetail(id1, id2){
    try{
      const {data} = await _axiosInstance.post("/products/userAds", {advert_id: [id1, id2]})
      console.log("barter ad details", data);
      return data;
    }catch(err){
      console.log("error APIClient", err)
      throw err;
    }
  }

  // var barterId = req.body.barter_id;
  // var barterStatus = req.body.barter_status;
  async updateBarterStatus(id, status){
    try{
      const {data} = await _axiosInstance.put("/barter/updateBarter", 
      {"barter_id": id, "barter_status": status})
      console.log("barter update", data);
      return data;
    }catch(err){
      console.log("error APIClient", err)
      throw err;
    }
  }

}

export default new ApiClient();
// export default class ApiClient {
//     _clientInstance = axios.create({
//       baseURL:  "http://localhost:5000/api",
//       timeout: 30000,
//       // headers: {
//       //   "x-access-token": need-to-add-token
//       // }
//     });

//   static handleError(err) {
//     if (err.response !== undefined) {
//       if (err.response.status === 401) {
//         window.location.href = "/signin";
//       } else {
//         throw err;
//       }
//     } else {
//       throw err;
//     }
//   }

// async login(email, password) {
//     try {
//       const { data } = await _clientInstance.post("/users/login", {"email": email, "password": password});
//       return data;
//     } catch (err) {
//       ApiClient.handleError(err);
//     }
//   }
// }
