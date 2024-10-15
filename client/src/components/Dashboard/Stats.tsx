"use client";

import { QueryKey } from "@/src/constants/query-key.constant";
import { UserService } from "@/src/services/user.service";
import { useAuthStore } from "@/src/store/Auth.store";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import AppLoader from "../AppLoader";

const Stats = () => {
  const {userData} = useAuthStore();
  const {
    data: userStatsData,
    isPending: isUserStatsPending,
    refetch: refetchUserStats,
  } = useQuery({
    queryKey: [QueryKey.USER_DASHBOARD_STATS],
    queryFn: () =>
      UserService.getUserStats(
        userData?.user_id || "",
      ),
  });
  useEffect(()=>{
    refetchUserStats();
  },[])
  return (
    <div className="my-3">
      <Row>
        <Col sm={12} md={4} lg={4} xl={4}>
          <Card>
            <CardBody>
              <Row>
                <Col>
                  <CardTitle className="text-uppercase text-muted mb-0">
                    Carbon Footprints
                  </CardTitle>
                  <span className="h2 font-weight-bold mb-0">{userStatsData?.user_data.carbon} kgco2e</span>
                </Col>
                <Col>
                  <Image
                    style={{ height: "7rem" }}
                    src="/assets/foot-print.png"
                    alt="Carbon Footprint"
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col sm={12} md={4} lg={4} xl={4}>
          <Card>
            <CardBody>
              <Row>
                <Col>
                  <CardTitle className="text-uppercase text-muted mb-0">
                    Water Saved
                  </CardTitle>
                  <span className="h2 font-weight-bold mb-0">{userStatsData?.user_data.water_saved} gallons</span>
                </Col>
                <Col>
                  <Image
                    style={{ height: "7rem" }}
                    src="/assets/droplet.png"
                    alt="Water Saved"
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col sm={12} md={4} lg={4} xl={4}>
          <Card>
            <CardBody>
              <Row>
                <Col>
                  <CardTitle className="text-uppercase text-muted mb-0">
                    Clothes donated
                  </CardTitle>
                  <span className="h2 font-weight-bold mb-0">{userStatsData?.user_data.clothes_donated}</span>
                </Col>
                <Col>
                  <Image
                    style={{ height: "7rem" }}
                    src="/assets/clothes.png"
                    alt="Clothes Donated"
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      {isUserStatsPending && <AppLoader/>}
    </div>
  );
};

export default Stats;
