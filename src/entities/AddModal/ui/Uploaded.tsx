export function Uploaded({isUploaded}: {isUploaded: boolean}) {
    if (isUploaded) {
        return(
            <div>
                <h1>Отправлено на рассмотрение!</h1>
                <p>Будет опубликована сразу после проверки модератора</p>
            </div>
        )
    }
    return(
        <div>
            <h1>Возникли проблемы!</h1>
            <p>{'Просим сообщить о проблеме по номеру: +996 (700)000000'}</p>
        </div>
    )
}