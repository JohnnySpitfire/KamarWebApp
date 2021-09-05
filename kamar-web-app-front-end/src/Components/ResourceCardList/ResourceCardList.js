import React from 'react'
import ResourceCard from '../ResourceCard/ResourceCard';
import { withRouter } from 'react-router';

const ResourceCardList = (propsParent) => {
    return(    
         propsParent.resourcesResponse.map((props, i) => {
                return(
                        <ResourceCard 
                            title={propsParent.resourcesResponse[i].title}
                            standardNumber={propsParent.resourcesResponse[i].standardNumber} 
                            link={propsParent.resourcesResponse[i].link} 
                        />
               )
         })
    )
}

export default withRouter(ResourceCardList)