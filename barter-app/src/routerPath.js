import { generatePath } from "react-router-dom"; 

class RouterPath {
  generatePath() {
    try {
      
      return generatePath("/productdescription", {});
    } catch (err) {
      console.log("error APIClient", err)
      throw err;
    }
  };

  

}

export default new RouterPath();

