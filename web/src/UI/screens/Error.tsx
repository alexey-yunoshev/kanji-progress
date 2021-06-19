import {Flex, Link, Text, View} from "@adobe/react-spectrum";
import {Link as RouterLink} from 'react-router-dom';
import React from "react";

export default function ErrorScreen() {
    return (
        <View
            minWidth="100vw"
            minHeight="100vh"
        >
            <Flex
                height="100vh"
                width="100vw"
                alignItems="center"
                justifyContent="center"
            >
                <View>
                    <View>
                        <Text>Sorry, there was an error</Text>
                    </View>
                    <Link>
                        <RouterLink to={{
                            pathname: `/`
                        }}>Go back to main</RouterLink>
                    </Link>
                </View>
            </Flex>
        </View>
    )
}
