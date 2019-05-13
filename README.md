# azure-js-cognitive-services-playground

learn [azure cognitive services](https://docs.microsoft.com/en-us/azure/cognitive-services/)

**Examples**

`runHandwrittenOCRForURL()` - uses computer vision `batchReadFile` API to perform handwritten OCR on a image of a form (image sourced from public URL).

## Resources

- [cognitive-services/computer-vision docs](https://docs.microsoft.com/en-us/azure/cognitive-services/computer-vision/)

## Running

1. Create new cognitive services computer vision resource
    ![](https://www.evernote.com/l/AAHErRlR-tFBJbb6x-JKpZTcsQpxXyx4KAAB/image.png)
1. Copy [`.env.sample`](.env.sample) to `.env` and populate with values via the following steps.
1. `CLIENT_ID`, `DOMAIN`
    ![](https://www.evernote.com/l/AAExoADr6tVHoLj4lOD_58FCSWmWAelxCrMB/image.png)
1. SUBSCRIPTION_ID
    ![](https://www.evernote.com/l/AAGdlioOXwpHEoGofH2nL-PJAIIOWlkvoiQB/image.png)
1. `COGNITIVE_SERVICES_ENDPOINT`
    ![](https://www.evernote.com/l/AAETKioZuRpHD48_sa7nDTP5A-5zla0Oew0B/image.png)
1. `COGNITIVE_SERVICES_KEY`
    ![](https://www.evernote.com/l/AAHdTNN4abtGmq5ZKgwh2vD6uOURbM6mhHwB/image.png)
1. run `npm start`


