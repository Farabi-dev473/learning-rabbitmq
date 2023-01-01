const amqp = require('amqplib')

const connectToRabbitMQ = async () => {
    const queue = 'tasks'
    const connection =  await amqp.connect('amqp://localhost:5672')

    const ch = await connection.createChannel()
    await ch.assertQueue('queue1')
    await ch.assertQueue('queue2')
    await ch.assertQueue('queue3')
    await ch.assertQueue('queue4')

    await ch.assertExchange('demo', 'fanout')

    await ch.bindQueue('queue1', 'demo')
    await ch.bindQueue('queue2', 'demo')
    await ch.bindQueue('queue3', 'demo')
    await ch.bindQueue('queue4', 'demo')

    setInterval(() => {
        ch.publish('demo', '', Buffer.from("Hello Farabi!"))
    }, 5000)
}

connectToRabbitMQ()