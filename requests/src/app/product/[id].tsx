import { Button } from "@/components/button";
import { LinkButton } from "@/components/link-button";
import { useCartStore } from "@/stores/cart-store";
import { PRODUCTS } from "@/utils/data/products";
import { formatCurrency } from "@/utils/functions/format-currency";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Image, Text, View } from "react-native";

export default function Product() {
  const { id } = useLocalSearchParams();
  const { add } = useCartStore();
  const navigation = useNavigation();
  const product = PRODUCTS.filter((product) => product.id === id)[0];

  function handleAddToCart() {
    add(product);

    navigation.goBack();
  }

  return (
    <View className="flex-1">
      <Image
        source={product.cover}
        className="h-52 w-full"
        resizeMode="cover"
      />
      <View className="mt-8 flex-1 p-5">
        <Text className="my-2 font-heading text-2xl text-lime-400">
          {formatCurrency(product.price)}
        </Text>
        <Text className="mb-6 font-body text-base leading-6 text-slate-400">
          {product.description}
        </Text>
        {product.ingredients.map((ingredient) => (
          <Text
            key={ingredient}
            className="font-body text-base leading-6 text-slate-400"
          >
            {"\u2022"} {ingredient}
          </Text>
        ))}
      </View>
      <View className="gap-5 p-5 pb-8">
        <Button onPress={handleAddToCart}>
          <Button.Icon>
            <Feather name="plus-circle" size={20} />
            <Button.Text>Adicionar ao pedido</Button.Text>
          </Button.Icon>
        </Button>
        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  );
}
