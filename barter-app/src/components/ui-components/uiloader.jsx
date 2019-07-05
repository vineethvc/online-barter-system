import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

const LoaderInline = () =>  
<div style= {{height: "80px", width: "80px", position: "absolute", bottom: "25%", left: "50%"}}>
<Dimmer active >
  <Loader size='massive'/>
</Dimmer>
</div>

export default LoaderInline