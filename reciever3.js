const amqp = require('amqplib')

const connectToRabbitMQ = async () => {
    const queue = 'queue3'
    const connection = await amqp.connect('amqp://localhost:5672')

    const ch = await connection.createChannel()
    await ch.assertQueue(queue)

    ch.consume(queue, (msg) => {
        console.log(msg.content.toString())
        ch.ack(msg)
    })

}

connectToRabbitMQ()