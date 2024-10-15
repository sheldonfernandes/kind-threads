import { QueryKey } from "@/src/constants/query-key.constant";
import { UserService } from "@/src/services/user.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Card, Col, Row, Image } from "react-bootstrap";
import AppLoader from "../AppLoader";
import { AppUtil } from "@/src/utils/App.util";

export const UserFeeds = () => {
  const {
    data: userFeedData,
    isPending: isUserFeedPending,
    refetch: refetchUserFeed,
  } = useQuery({
    queryKey: [QueryKey.USER_FEED_LIST],
    queryFn: () => UserService.getUserFeed(),
  });
  useEffect(() => {
    refetchUserFeed();
  }, []);
  return (
    <>
      {userFeedData?.inventory_list.map((item) => (
        <Card className="my-3">
          <Card.Body>
            <Row>
              <Col xs={12}></Col>
            </Row>

            <Row>
              <Col xs={8} sm={9} md={9} lg={9}>
                <div className="d-flex align-items-center mb-3">
                  <Image
                    src="/assets/green-avatar.png"
                    style={{ width: "4rem" }}
                    rounded
                    roundedCircle
                  />{" "}
                  <div className="ms-3">
                    <Card.Title className="fs-5">{item.user_name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {new AppUtil().getDateTime(item.submitted_date)}
                    </Card.Subtitle>
                  </div>
                </div>
                <div className="fs-5 fw-bold">
                  {item.ai_response.short_desc}
                </div>
                <br />
                Carbon Footprint : {item.stats.carbon} kgco2e
                <br />
                Water Saved : {item.stats.water_saved} gallons
              </Col>
              <Col xs={4} sm={3} md={3} lg={3}>
                <Image
                  style={{ width: "12rem", height: "12rem" }}
                  src={item.material_image}
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
      {isUserFeedPending && <AppLoader />}
    </>
  );
};
export default UserFeeds;
