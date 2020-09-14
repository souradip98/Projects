import tensorflow
from tensorflow.keras.datasets import mnist

(X_train, Y_train), (X_test, Y_test) = mnist.load_data()
X_train = X_train.reshape(60000, 28, 28, 1)
X_test = X_test.reshape(10000, 28, 28, 1)
# One_Hot_Encoding
from tensorflow.keras.utils import to_categorical

Y_train = to_categorical(Y_train)
Y_test = to_categorical(Y_test)
from tensorflow.keras.layers import Conv2D, Dense, Flatten

model = tensorflow.keras.Sequential()
c_layer1 = Conv2D(64, kernel_size=3, activation='relu', input_shape=(28, 28, 1))
c_layer2 = Conv2D(64, kernel_size=3, activation='relu')
flat = Flatten()
h_layer = Dense(10, activation='softmax')
model.add(c_layer1)
model.add(c_layer2)
model.add(flat)
model.add(h_layer)
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
model.summary()
model.fit(X_train, Y_train, validation_data=(X_test, Y_test), batch_size=50, epochs=2)
