import React from "react";

import {
    Button,
    FieldError,
    Form,
    Input,
    TextField,
} from "react-aria-components";

async function query(data: { inputs: string }) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
        {
            headers: {
                Authorization: `Bearer ${
                    import.meta.env.VITE_HUGGING_FACE_TOKEN
                }`,
            },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.blob();
    return result;
}

function App() {
    const [status, setStatus] = React.useState<
        "idle" | "loading" | "success" | "error"
    >("idle");
    const [prompt, setPrompt] = React.useState("");
    const imgRef = React.useRef<HTMLImageElement>(null);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setStatus("loading");

        try {
            if (!prompt) return;

            const response = await query({ inputs: prompt });
            const urlCreator = window.URL || window.webkitURL;
            const imageUrl = urlCreator.createObjectURL(response);

            if (imgRef.current) imgRef.current.src = imageUrl;
            setStatus("success");
        } catch (error) {
            setStatus("error");
            console.log(error);
        }
    }

    return (
        <div className='@container h-screen'>
            <nav className='border-b px-4'>
                <div className='flex justify-between items-center py-4 max-w-5xl mx-auto'>
                    <div className='flex items-center gap-x-2'>
                        <svg
                            width='15'
                            height='15'
                            viewBox='0 0 15 15'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                            className='size-6'
                        >
                            <path
                                d='M0.877075 7.49985C0.877075 3.84216 3.84222 0.877014 7.49991 0.877014C11.1576 0.877014 14.1227 3.84216 14.1227 7.49985C14.1227 11.1575 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1575 0.877075 7.49985ZM3.78135 3.21565C4.68298 2.43239 5.83429 1.92904 7.09998 1.84089V6.53429L3.78135 3.21565ZM3.21567 3.78134C2.43242 4.68298 1.92909 5.83428 1.84095 7.09997H6.5343L3.21567 3.78134ZM6.5343 7.89997H1.84097C1.92916 9.16562 2.43253 10.3169 3.21579 11.2185L6.5343 7.89997ZM3.78149 11.7842C4.6831 12.5673 5.83435 13.0707 7.09998 13.1588V8.46566L3.78149 11.7842ZM7.89998 8.46566V13.1588C9.16559 13.0706 10.3168 12.5673 11.2184 11.7841L7.89998 8.46566ZM11.7841 11.2184C12.5673 10.3168 13.0707 9.16558 13.1588 7.89997H8.46567L11.7841 11.2184ZM8.46567 7.09997H13.1589C13.0707 5.83432 12.5674 4.68305 11.7842 3.78143L8.46567 7.09997ZM11.2185 3.21573C10.3169 2.43246 9.16565 1.92909 7.89998 1.8409V6.53429L11.2185 3.21573Z'
                                fill='currentColor'
                                fillRule='evenodd'
                                clipRule='evenodd'
                            ></path>
                        </svg>
                        <h1 className='text-2xl font-bold'>Brush Stroke</h1>
                    </div>
                </div>
            </nav>
            <div className='max-w-4xl mx-auto mt-8 px-4'>
                <Form onSubmit={onSubmit} className='py-2'>
                    <fieldset className='flex w-full gap-x-2'>
                        <TextField
                            name='prompt'
                            aria-label='Prompt'
                            type='text'
                            onChange={setPrompt}
                            className='grid flex-1'
                            isRequired
                        >
                            <Input
                                placeholder='Type your prompt'
                                className='border h-12 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                            />
                            <FieldError />
                        </TextField>
                        <Button
                            type='submit'
                            className='inline-flex h-12 lg:w-40 justify-center rounded-xl items-center gap-x-2 px-4 py-2 font-medium text-white bg-indigo-600 border border-transparent shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        >
                            {status === "loading" && (
                                <svg
                                    width='15'
                                    height='15'
                                    viewBox='0 0 15 15'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='animate-spin'
                                >
                                    <path
                                        d='M1.90321 7.29677C1.90321 10.341 4.11041 12.4147 6.58893 12.8439C6.87255 12.893 7.06266 13.1627 7.01355 13.4464C6.96444 13.73 6.69471 13.9201 6.41109 13.871C3.49942 13.3668 0.86084 10.9127 0.86084 7.29677C0.860839 5.76009 1.55996 4.55245 2.37639 3.63377C2.96124 2.97568 3.63034 2.44135 4.16846 2.03202L2.53205 2.03202C2.25591 2.03202 2.03205 1.80816 2.03205 1.53202C2.03205 1.25588 2.25591 1.03202 2.53205 1.03202L5.53205 1.03202C5.80819 1.03202 6.03205 1.25588 6.03205 1.53202L6.03205 4.53202C6.03205 4.80816 5.80819 5.03202 5.53205 5.03202C5.25591 5.03202 5.03205 4.80816 5.03205 4.53202L5.03205 2.68645L5.03054 2.68759L5.03045 2.68766L5.03044 2.68767L5.03043 2.68767C4.45896 3.11868 3.76059 3.64538 3.15554 4.3262C2.44102 5.13021 1.90321 6.10154 1.90321 7.29677ZM13.0109 7.70321C13.0109 4.69115 10.8505 2.6296 8.40384 2.17029C8.12093 2.11718 7.93465 1.84479 7.98776 1.56188C8.04087 1.27898 8.31326 1.0927 8.59616 1.14581C11.4704 1.68541 14.0532 4.12605 14.0532 7.70321C14.0532 9.23988 13.3541 10.4475 12.5377 11.3662C11.9528 12.0243 11.2837 12.5586 10.7456 12.968L12.3821 12.968C12.6582 12.968 12.8821 13.1918 12.8821 13.468C12.8821 13.7441 12.6582 13.968 12.3821 13.968L9.38205 13.968C9.10591 13.968 8.88205 13.7441 8.88205 13.468L8.88205 10.468C8.88205 10.1918 9.10591 9.96796 9.38205 9.96796C9.65819 9.96796 9.88205 10.1918 9.88205 10.468L9.88205 12.3135L9.88362 12.3123C10.4551 11.8813 11.1535 11.3546 11.7585 10.6738C12.4731 9.86976 13.0109 8.89844 13.0109 7.70321Z'
                                        fill='currentColor'
                                        fillRule='evenodd'
                                        clipRule='evenodd'
                                    ></path>
                                </svg>
                            )}
                            <span>Generate</span>
                        </Button>
                    </fieldset>
                </Form>

                <img
                    ref={imgRef}
                    alt='result'
                    className={
                        "w-full lg:aspect-video lg:object-contain mt-8 " +
                        (status === "success" ? "block" : "hidden")
                    }
                />
            </div>

            <footer className='absolute bottom-0 text-sm gap-y-1 px-4 lg:text-center py-4 lg:grid lg:place-items-center w-full'>
                <div className='font-medium text-gray-600'>
                    Developed by{" "}
                    <a
                        href='https://tmnyoni.site'
                        rel='noopener'
                        target='_blank'
                    >
                        Tawanda M.
                    </a>
                </div>
                <p className='text-gray-600 text-xs'>
                    Using{" "}
                    <a
                        href='https://github.com/Stability-AI/generative-models'
                        target='_blank'
                        rel='noopener'
                    >
                        D-XL 1.0-base
                    </a>{" "}
                    Developed by Stability AI
                </p>
            </footer>
        </div>
    );
}

export default App;
