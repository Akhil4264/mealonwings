import axios from 'axios';

export const createOrder = async order => {
  try {
    const { data } = axios.post('/api/orders/create', order);
    return data;
  } catch (error) {}
};


export const changeLoc = async(compLoc,order) => {
  try {
    const { data } = axios.post('/api/orders/changeLoc', {compLoc,order});
    // return data;
  } catch (error) {}
}

export const getNewOrderForCurrentUser = async () => {
  const { data } = await axios.get('/api/orders/newOrderForCurrentUser');
  return data;
};

export const pay = async paymentId => {
  try {
    const { data } = await axios.put('/api/orders/pay', { paymentId });
    return data;
  } catch (error) {}
};

export const trackOrderById = async orderId => {
  const { data } = await axios.get('/api/orders/track/' + orderId);
  return data;
};

export const getAll = async state => {
  const { data } = await axios.get(`/api/orders/all`);
  return data;
};

export const getAllStatus = async () => {
  const { data } = await axios.get(`/api/orders/allstatus`);
  return data;
};


export const endRun = async(order) => {
  try{
    const {data} = await axios.post('/api/orders/endrun',{order});
    return data
  }
  catch(e){
    console.log(e)
  }
}
