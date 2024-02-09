import { useState } from 'react';

const Comm = async ()=>{
    const [analysis , setAnalysis] = useState("...");
    const fetch = require('node-fetch');
    const url = 'https://chatgpt-42.p.rapidapi.com/conversationgpt4';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '17eac2bf0fmshd091c190cbe1e84p16a166jsn85ac492c906a',
            'X-RapidAPI-Host': 'chatgpt-42.p.rapidapi.com'
        },
        body: {
            messages: [
                {
                    role: 'user',
                    content: 'hello'
                }
            ],
            system_prompt: '',
            temperature: 0.9,
            top_k: 5,
            top_p: 0.9,
            max_tokens: 256,
            web_access: false
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }

    return result;
}
export default Comm;