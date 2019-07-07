function parseData(data) {
    //let arrData = data.split("link:")
    //data = arrData.length == 2? arrData[1]: data;
    if (data === undefined) {
      
      return false
    }

    let parsed_data = {}

    let arrData = data.split(",")

    for (let d of arrData){
        let linkInfo = /<([^>]+)>;\s+rel="([^"]+)"/ig.exec(d)

        parsed_data[linkInfo[2]]=linkInfo[1]
    }

    return parsed_data;
}

export default parseData;
