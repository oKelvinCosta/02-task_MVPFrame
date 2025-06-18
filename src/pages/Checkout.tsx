import { MapPinCheck, Banknote, Trash2, DollarSign, CreditCard, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import MvpFrame from "@/components/MvpFrame";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCartContext } from "@/context/CartContext";
import type { ProductItem } from "@/assets/ProductsList";
import { useMemo } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductsContext } from "@/context/ProductsContext";
import ProductIncrease from "@/components/ProductIncrease";

const formSchema = z.object({
  cep: z
    .string()
    .min(8, "CEP deve ter 8 dígitos")
    .max(9, "CEP deve ter no máximo 9 caracteres")
    .regex(/^\d{5}-?\d{3}$/, "CEP inválido"),
  rua: z.string().min(2, {
    message: "Rua precisa ter pelo menos 2 caracteres.",
  }),
  numero: z.string().min(1, {
    message: "Numero precisa ter 1 número",
  }),
  complemento: z.string().min(2, {
    message: "Complemento precisa ter pelo menos 2 caracteres.",
  }),
  bairro: z.string().min(2, {
    message: "Bairro precisa ter pelo menos 2 caracteres.",
  }),
  cidade: z.string().min(2, {
    message: "Cidade precisa ter pelo menos 2 caracteres.",
  }),
  uf: z.string().min(2, {
    message: "UF precisa ter 2 caracteres.",
  }),
  paymentType: z.enum(["credito", "debito", "dinheiro"], {
    required_error: "Selecione um tipo de pagamento.",
  }),
});

export default function Checkout() {
  const navigate = useNavigate();
  const cartContext = useCartContext();
  const { cart, setCurrentCheckoutHelper, setCartList, setCheckoutSuccessList } = cartContext;
  const productsContext = useProductsContext();
  const { products, setProductsList } = productsContext;

  // encher com o form, e dados do produto

  // 1. Define your form.
  const checkoutForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cep: "",
      rua: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      uf: "",
      paymentType: undefined,
    },
  });

  const { watch } = checkoutForm;
  const adressIsFilled = watch("cep") ? true : false;

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const currentCheckout = {
      purchase: cart,
      form: values,
    };
    setCurrentCheckoutHelper(currentCheckout);

    // Clean cart
    setCartList([]);

    updateProductsStock();

    setCheckoutSuccessList((state) => [...state, currentCheckout]);

    navigate("/checkout-success");
  }

  function updateProductsStock() {
    const newProductsList = products
      .map((productItem) => {
        // Find the correspondent item in cart and substract the stock
        const cartItem = cart.find((item) => item.id === productItem.id);
        if (cartItem) {
          return { ...productItem, stock: productItem.stock - cartItem.stock };
        }

        return productItem;
      })
      .filter((productItem) => productItem.stock > 0);

    setProductsList(newProductsList);
  }

  return (
    <div className="py-10 lg:py-20 w-full">
      <div className="container">
        {/* GRID */}

        <Form {...checkoutForm}>
          <form onSubmit={checkoutForm.handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-12 gap-6">
              {/* LEFT */}
              <div className="md:col-span-6 lg:col-span-7 ">
                <AdressForm form={checkoutForm} />
                <PaymentMethodForm form={checkoutForm} />
              </div>

              {/* RIGHT */}
              <div className="md:col-span-6 lg:col-span-5 w-full flex flex-col ">
                <MvpsSelected adressIsFilled={adressIsFilled} />
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

function AdressForm({ form }) {
  const [isCepValid, setIsCepValid] = useState(false);
  const [cepWasBlurred, setCepWasBlurred] = useState(false);

  return (
    <>
      <h5>Complete seu pedido</h5>
      <div className="border-2 bg-white border-blue-200 rounded-md p-6 md:p-10">
        <div className="flex gap-6">
          <MapPinCheck className="text-blue-600" />
          <div>
            <p className="!mb-2">Endereço de Entrega</p>
            <p className="!text-sm !m-0">Informe o endereço onde deseja receber seu pedido</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          <FormField
            control={form.control}
            name="cep"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="CEP"
                    {...field}
                    onChange={async (e) => {
                      field.onChange(e);
                      // Trigger validation on change to clear error when CEP becomes valid
                      if (cepWasBlurred) {
                        await form.trigger("cep");
                      }
                    }}
                    onBlur={async () => {
                      setCepWasBlurred(true);
                      const isValid = await form.trigger("cep");
                      setIsCepValid(isValid);

                      fetch(`https://viacep.com.br/ws/${field.value}/json/`)
                        .then((response) => response.json())
                        .then((data) => {
                          form.setValue("rua", data.logradouro);
                          form.setValue("bairro", data.bairro);
                          form.setValue("cidade", data.localidade);
                          form.setValue("uf", data.uf);
                        })
                        .catch((error) => {
                          console.error(error);
                        });
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rua"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Rua" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="numero"
              render={({ field }) => (
                <FormItem className="flex-4">
                  <FormControl>
                    <Input placeholder="Número" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="complemento"
              render={({ field }) => (
                <FormItem className="flex-8">
                  <FormControl>
                    <Input placeholder="Complemento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="bairro"
              render={({ field }) => (
                <FormItem className="flex-4">
                  <FormControl>
                    <Input placeholder="Bairro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cidade"
              render={({ field }) => (
                <FormItem className="flex-6">
                  <FormControl>
                    <Input placeholder="Cidade" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="uf"
              render={({ field }) => (
                <FormItem className="flex-2">
                  <FormControl>
                    <Input placeholder="UF" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function PaymentMethodForm({ form }) {
  return (
    <>
      <div className="mt-6 border-2 bg-white border-blue-200 rounded-md p-6 md:p-10">
        <div className="flex gap-6">
          <DollarSign className="text-amber-400" />
          <div>
            <p className="!mb-2">Pagamento</p>
            <p className="!text-sm !m-0">O pagamento é feito na entrega. Escolha a forma que deseja pagar</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-6">
          <FormField
            control={form.control}
            name="paymentType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} value={field.value} className="flex  flex-wrap gap-6">
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <RadioGroupItem value="credito" id="credito" className="peer hidden" />
                      </FormControl>
                      <FormLabel
                        htmlFor="credito"
                        className="flex items-center bg-gray-100 justify-between rounded-md border-2 border-muted border-gray-300  p-4 hover:brightness-90 hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                      >
                        <CreditCard className="text-blue-600" />
                        Cartão de crédito
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <RadioGroupItem value="debito" id="debito" className="peer hidden" />
                      </FormControl>
                      <FormLabel
                        htmlFor="debito"
                        className="flex items-center bg-gray-100 justify-between rounded-md border-2 border-muted border-gray-300  p-4 hover:brightness-90 hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                      >
                        <Landmark className="text-blue-600" />
                        Cartão de débito
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <RadioGroupItem value="dinheiro" id="dinheiro" className="peer hidden" />
                      </FormControl>
                      <FormLabel
                        htmlFor="dinheiro"
                        className="flex items-center bg-gray-100 justify-between rounded-md border-2 border-muted border-gray-300  p-4 hover:brightness-90 hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                      >
                        <Banknote className="text-blue-600" />
                        Dinheiro
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </>
  );
}

function MvpsSelected({ adressIsFilled = true }) {
  const cartContext = useCartContext();
  const { cart } = cartContext;

  //  Show the currency string
  const formatCurrency = (value: string | number) => {
    const numberValue = typeof value === "string" ? Number(value.replace(".", "").replace(",", ".")) : value;

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(numberValue);
  };

  // Convert to decimal Number
  const toNumber = (value: string | number) =>
    typeof value === "string" ? Number(value.replace(".", "").replace(",", ".")) : value;

  const sumProductsFromCart = useMemo(() => {
    return cart.reduce((total, product) => total + Number(product.price.replace(",", ".")) * product.stock, 0);
  }, [cart]);

  const fare = toNumber("12,50");

  return (
    <>
      <h5>MVPs selecionados</h5>

      {/* Card */}
      <div className="border-2 bg-white border-blue-200 rounded-md rounded-tr-3xl rounded-bl-3xl p-6 md:p-10">
        {/* Products */}
        <ProductsListCheckout />

        <ul className="flex flex-col gap-2 mt-6">
          <li className="flex justify-between">
            Total de itens <span>{adressIsFilled ? formatCurrency(sumProductsFromCart) : "..."}</span>
          </li>
          <li className="flex justify-between">
            Entrega <span> {adressIsFilled ? formatCurrency(fare) : "..."}</span>
          </li>
          <li className="flex justify-between font-bold text-xl">
            Total <span>{adressIsFilled ? formatCurrency(fare + sumProductsFromCart) : "..."}</span>
          </li>
        </ul>

        <Button
          type="submit"
          className="uppercase w-full mt-6"
          variant="secondary"
          disabled={!adressIsFilled || cart.length === 0}
        >
          Confirmar Pedido
        </Button>
      </div>
    </>
  );
}

function ProductsListCheckout() {
  const cartContext = useCartContext();
  const { cart, setCartList } = cartContext;

  function handleAddProductToCart(productId: string) {
    // Verify stock of products
    const currentProduct = cart.find((product) => product.id === productId);
    if (currentProduct) {
      // verify if product is already in cart
      const productInCart = cart.find((item) => item.id === productId);
      if (productInCart) {
        // if is in cart, update stock

        const newProductInCart = cart.map((productItem) =>
          productItem.id === productId ? { ...productItem, stock: productItem.stock + 1 } : productItem
        );

        setCartList(newProductInCart);
      } else {
        // if is not in cart, add to cart
        setCartList([...cart, { ...currentProduct, stock: 1 }]);
      }
    }
  }

  function handleSubtractProductFromCart(productId: string) {
    // If product is in Cart and stock >= 1
    const newCart = cart
      .map((cartItem) => (cartItem.id === productId ? { ...cartItem, stock: cartItem.stock - 1 } : cartItem))
      .filter((cartItem) => cartItem.stock > 0);

    setCartList(newCart);
  }

  function handleRemoveProductFromCart(productId: string) {
    const newCart = cart.filter((cartItem) => cartItem.id !== productId);
    setCartList(newCart);
  }

  return (
    <ul className="flex flex-col gap-6">
      {cart.map((productItem, index) => (
        <li key={index} className="flex flex-wrap gap-2 border-b border-blue-200 pb-4">
          <MvpFrame product={productItem} className="!max-w-[60px] min-w-[50px]" />
          <div className="flex flex-col gap-2 mt-1">
            <p className="!m-0">{productItem.name}</p>
            <div className="flex gap-2">
              <ProductIncrease product={productItem} className="bg-gray-200" />
              <Button
                onClick={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                  handleRemoveProductFromCart(productItem.id);
                }}
                className="uppercase"
                variant="gray"
              >
                <Trash2 className="text-blue-600" />
                Remover
              </Button>
            </div>
          </div>
          <span className="text-right ml-auto">
            <b>R$ {productItem.price}</b>
          </span>
        </li>
      ))}
    </ul>
  );
}
